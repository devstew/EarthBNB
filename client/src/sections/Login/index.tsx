import * as React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Card, Layout, Typography } from "antd";
import { AUTH_URL} from "../../lib/graphql/queries/AuthUrl";
import { LOG_IN} from "../../lib/graphql/mutations";
import { AuthUrl as AuthUrlData } from "../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl";
import { LogIn as LogInData, LogInVariables } from "../../lib/graphql/mutations/LogIn/__generated__/LogIn";
import { Viewer } from '../../lib/types';


//image assets
import googleLogo from './assets/google_logo.jpg';

interface Props {
    setViewer: (viewer: Viewer) => void;
}

const { Content } = Layout;
const { Text, Title  } = Typography;

export const Login = ({ setViewer }: Props) => {
    const client = useApolloClient();
    const [logIn, {
        data: logInData,
        loading: logInLoading,
        error: logInError
    }] = useMutation<LogInData, LogInVariables>(LOG_IN);

    const handleAuthorize = async () => {
        try {
            const { data } = await client.query<AuthUrlData>({
                query: AUTH_URL
            })

            window.location.href = data.authUrl;
        } catch {

        }
    };

    return (
        <Content className="log-in">
            <Card className="log-in-card">
                <div className="log-in-card__intro">
                    <Title level={3} className="log-in-card__intro-title">
                        <span role="img" aria-label="wave">
                            👨🏿‍💻
                        </span>
                    </Title>
                    <Title level={3} className="log-in-card__intro-title">
                        Log in to EarthBNB!
                    </Title>
                    <Text> Sign in with Google to start booking available rentals!</Text>
                </div>
                <button className="log-in-card__google-button" onClick={handleAuthorize}>
                    <img src={googleLogo} alt="Google Logo" className="log-in-card__google-button-logo"/>
                    <span className="log-in-card__google-button-text">
                        Sign in with Google
                    </span>
                </button>
            </Card>

        </Content>
    )
};