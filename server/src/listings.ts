interface Listing {
    id: string,
    title: string,
    image: string,
    address: string,
    price: number,
    numOfGuests: number,
    numOfBeds: number,
    numOfBaths: number,
    rating: number
}

export const listings: Listing[] = [
    {
        id: '001',
        title: 'Clean and fully furnished apartment. 5 min away from CN Tower',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        address: "3210 Scotchmere Dr W, Toronto, ON, CA",
        price: 10000,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 2,
        rating: 5
    },
    {
        id: '002',
        title: 'Clean, furnished apartment. 5 min away from CN Tower',
        image: 'https://images.unsplash.com/photo-1566601146613-82f9dbd68995?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        address: "3210 Scotchmere Dr W, Toronto, ON, CA",
        price: 10500,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 2,
        rating: 5
    },
    {
        id: '003',
        title: 'Clean apartment. 5 min away from CN Tower',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80',
        address: "3210 Scotchmere Dr W, Toronto, ON, CA",
        price: 9000,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 2,
        rating: 3
    },
]