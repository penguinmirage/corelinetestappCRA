import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { testNYTimesConnection, validateApiKey, getApiSetupInstructions } from '../../utils/testApi';

interface ApiStatusProps {
  showInstructions?: boolean;
}

const ApiStatus: React.FC<ApiStatusProps> = ({ showInstructions = false }) => {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');
  const [showDetails, setShowDetails] = useState(false);

  const apiKey = process.env.REACT_APP_NY_TIMES_API_KEY || '';
  const isUsingMock = process.env.REACT_APP_MOCK_API === 'true';
  const hasValidApiKey = validateApiKey(apiKey);

  useEffect(() => {
    if (!isUsingMock && hasValidApiKey) {
      // Auto-test API connection on mount if not using mock
      handleTestConnection();
    }
  }, [isUsingMock, hasValidApiKey]);

  const handleTestConnection = async () => {
    setStatus('testing');
    setMessage('Testing connection to NY Times API...');

    try {
      const result = await testNYTimesConnection();
      setStatus(result.success ? 'success' : 'error');
      setMessage(result.message);
    } catch (error) {
      setStatus('error');
      setMessage('Failed to test API connection');
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success': return '#52c41a';
      case 'error': return '#ff4d4f';
      case 'testing': return '#1890ff';
      default: return '#8c8c8c';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'testing': return '🔄';
      default: return '⚪';
    }
  };

  if (!showInstructions && isUsingMock) {
    return null; // Don't show anything when using mock data unless explicitly requested
  }

  return (
    <StatusContainer>
      <StatusHeader>
        <StatusIndicator color={getStatusColor()}>
          {getStatusIcon()} API Status
        </StatusIndicator>
        {!isUsingMock && (
          <TestButton onClick={handleTestConnection} disabled={status === 'testing'}>
            {status === 'testing' ? 'Testing...' : 'Test Connection'}
          </TestButton>
        )}
      </StatusHeader>

      <StatusMessage color={getStatusColor()}>
        {message}
      </StatusMessage>

      <ConfigInfo>
        <ConfigItem>
          <strong>Mode:</strong> {isUsingMock ? 'Mock Data' : 'Real NY Times API'}
        </ConfigItem>
        <ConfigItem>
          <strong>API Key:</strong> {hasValidApiKey ? '✅ Configured' : '❌ Missing or Invalid'}
        </ConfigItem>
      </ConfigInfo>

      {(showInstructions || (!hasValidApiKey && !isUsingMock)) && (
        <InstructionsSection>
          <InstructionsToggle onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? '🔽' : '▶️'} Setup Instructions
          </InstructionsToggle>

          {showDetails && (
            <Instructions>
              <pre>{getApiSetupInstructions()}</pre>
            </Instructions>
          )}
        </InstructionsSection>
      )}
    </StatusContainer>
  );
};

const StatusContainer = styled.div`
  background: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const StatusIndicator = styled.div<{ color: string }>`
  color: ${props => props.color};
  font-weight: 600;
  font-size: 14px;
`;

const TestButton = styled.button`
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #40a9ff;
  }

  &:disabled {
    background: #d9d9d9;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.div<{ color: string }>`
  color: ${props => props.color};
  font-size: 13px;
  margin-bottom: 12px;
  line-height: 1.5;
`;

const ConfigInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
`;

const ConfigItem = styled.div`
  font-size: 12px;
  color: #595959;
`;

const InstructionsSection = styled.div`
  border-top: 1px solid #d9d9d9;
  padding-top: 12px;
`;

const InstructionsToggle = styled.button`
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  font-size: 13px;
  padding: 0;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;

const Instructions = styled.div`
  margin-top: 8px;
  padding: 12px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 4px;

  pre {
    margin: 0;
    font-size: 11px;
    line-height: 1.4;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

export default ApiStatus;
