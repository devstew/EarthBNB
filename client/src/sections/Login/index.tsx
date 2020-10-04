import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { useEffect, useRef } from "react";
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Card, Layout, Spin, Typography } from "antd";
import { ErrorBanner} from "../../lib/components/ErrorBanner";
import { AUTH_URL} from "../../lib/graphql/queries/AuthUrl";
import { LOG_IN} from "../../lib/graphql/mutations";
import { AuthUrl as AuthUrlData } from "../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl";
import {
    LogIn as LogInData,
    LogInVariables
} from "../../lib/graphql/mutations/LogIn/__generated__/LogIn";
import {
    displaySuccessNotification,
    displayErrorMessage } from "../../lib/utils";
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
    }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
        onCompleted: data => {
            if (data && data.logIn) {
                setViewer(data.logIn);
                displaySuccessNotification("You've successsfully logged in");
            }
        }
    });

    const logInRef = useRef(logIn);

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");

        if(code) {
            logInRef.current({
                variables: {
                    input: { code }
                }
            })
        }
    }, []);

    const handleAuthorize = async () => {
        try {
            const { data } = await client.query<AuthUrlData>({
                query: AUTH_URL
            })

            window.location.href = data.authUrl;
        } catch {
            displayErrorMessage("Sorry! We werent't able to log you in, Please try again later!")
        }
    };

    if(logInLoading) {
        return (
            <Content className="log-in">
                <Spin size="large" tip="Logging you in..."/>
            </Content>
        );
    }

    if(logInData && logInData.logIn) {
        const {id: viewerId} = logInData.logIn;
        return <Redirect to={`/user/${viewerId}`}/>
    }

    const logInErrorBannerElement = logInError ? (
        <ErrorBanner description="Sorry! We werent't able to log you in, Please try again later!"/>
    ) : null;

    return (
        <Content className="log-in">
            {logInErrorBannerElement}
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