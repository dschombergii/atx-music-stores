import React, { useContext } from 'react'
import { Container, Paper } from '@material-ui/core';
import Map from './Map'
import { useParams } from 'react-router-dom'

import { ListingsContext } from '../../contexts/ListingsContext'

export default function BusinessDetails(props) {
    const { listings } = useContext(ListingsContext)

    const id = useParams()
    const listing = listings.find(listing => listing.id === parseInt(id.id))

    return (
        <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
            <h2 style={{ textAlign: "left" }}>{listing.name}</h2>
            <h3>{listing.address}</h3>
            <h3>{listing.hours}</h3>
            <p>{listing.description}</p>
            <Map position={listing.position} />
        </Container>
    )
}
