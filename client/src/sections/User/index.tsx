import * as React from 'react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Layout, Row } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { USER } from '../../lib/graphql/queries';
import { User as
         UserData,
         UserVariables
} from '../../lib/graphql/queries/User/__generated__/User';
import { Viewer } from '../../lib/types';
import { ErrorBanner, PageSkeleton } from '../../lib/components';
import {
    UserBookings,
    UserListings,
    UserProfile
} from './components';

interface Props {
    viewer: Viewer;
}

interface MatchParams {
    id: string
}

const { Content } = Layout;
const PAGE_LIMIT = 4;

export const User = ({ viewer, match }: Props & RouteComponentProps<MatchParams> ) => {

    const [listingsPage, setListingsPage] = useState(1);
    const [bookingsPage, setBookingsPage] = useState(1);

    const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
        variables: {
            id: match.params.id,
            bookingsPage,
            listingsPage,
            limit: PAGE_LIMIT
        }
    });



    if (loading) {
        return (
            <Content className="user">
                <PageSkeleton />
            </Content>
        )
    }

    if (error) {
        return (
            <Content className="user">
                <ErrorBanner description="This user may not exist or we've encounted an error. Please try again later"/>
                <PageSkeleton />
            </Content>
        )
    }

    const user = data ? data.user : null;
    const viewerIsUser = viewer.id === match.params.id;

    const userListings = user ? user.listings : null;
    const userBookings = user ? user.bookings : null;

    const userProfileElement = user ? <UserProfile user={user} viewerIsUser={viewerIsUser}/> : null;

    const userListingsElement = userListings ? (
        <UserListings
            userListings={userListings}
            listingsPage={listingsPage}
            limit={PAGE_LIMIT}
            setListingsPage={setListingsPage}
        />
    ) : null;

    const userBookingsElement = userBookings ? (
        <UserBookings
            userBookings={userBookings}
            bookingsPage={bookingsPage}
            limit={PAGE_LIMIT}
            setBookingsPage={setBookingsPage}
        />
    ) : null;

    return (
        <Content className="user">
            <Row gutter={12} type="flex" justify="space-between">
                <Col xs={24}>
                    {userProfileElement}
                </Col>
                <Col xs={24}>
                    {userListingsElement}
                    {userBookingsElement}
                </Col>
            </Row>
        </Content>
    )
};