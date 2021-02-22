import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import DeleteIcon from '@material-ui/icons/Delete'
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core'

import { useAuth } from '../../contexts/AuthContext'
import { ListingsContext } from '../../contexts/ListingsContext'

export default function Businesses(props) {
    const { currentUser } = useAuth()
    const { listings, removeListing } = useContext(ListingsContext)

    useEffect(() => {
    }, [])

    return (

        <Container maxWidth="lg" className="car-container">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Hours</TableCell>
                        <TableCell>Address</TableCell>
                        {currentUser ? <TableCell>Delete</TableCell> : null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listings.map((listing, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Link to={`/details/${listing.id}`} style={{ textDecoration: 'underline' }}>{listing["name"]}</Link>
                            </TableCell>
                            <TableCell>{listing["description"]}</TableCell>
                            <TableCell>{listing["hours"]}</TableCell>
                            <TableCell>{listing["address"]}</TableCell>
                            {currentUser ? <TableCell>
                                <DeleteIcon onClick={() => removeListing(listing.id)} className="icon text-red" />
                            </TableCell> : null}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
}
