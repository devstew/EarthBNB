import merge from 'lodash.merge';
import { listingResolvers} from "./Listing";
import { bookingResolvers} from "./Booking";
import { viewerResolvers} from "./Viewer";
import { userResolvers} from "./User";

export const resolvers = merge(
    viewerResolvers,
    bookingResolvers,
    listingResolvers,
    userResolvers
);