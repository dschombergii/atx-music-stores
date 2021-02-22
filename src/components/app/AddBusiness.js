import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { TextField, Button, Container } from '@material-ui/core'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch';

import { ListingsContext } from '../../contexts/ListingsContext'

export default function AddBusiness() {

    const { listings, addListing } = useContext(ListingsContext)

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [hours, setHours] = useState("")
    const [description, setDescription] = useState("")
    const [position, setPosition] = useState([30.266666, -97.733330])
    const history = useHistory()

    const allListings = []
    listings.map(listing => allListings.push(listing.id))
    const newId = (Math.max(...allListings)) + 1

    const handleSubmit = e => {
        e.preventDefault()

        const newListing = {
            id: newId,
            name,
            address,
            hours,
            description,
            position,
        }
        addListing(newListing)
        history.push('/')
    }

    useEffect(async () => {
        const provider = new OpenStreetMapProvider();

        const results = await provider.search({ query: address });

        let xCoord;
        let yCoord;

        if (results.length != 0) {
            xCoord = results[0].x
            yCoord = results[0].y
            setPosition([yCoord, xCoord])
        }

    }, [address, MapContainer])


    return (
        // <Grid style={{ marginTop: "2em" }} container direction="row">
        <Container minWidth="sm" style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", paddingTop: '5rem' }}>
            <form onSubmit={handleSubmit} className="add-form">
                <TextField
                    onChange={e => setName(e.target.value)}
                    required
                    name="name"
                    label="Name"
                    type="text"
                />
                <TextField
                    onChange={e => setAddress(e.target.value)}
                    required
                    name="address"
                    label="Address"
                    type="text"
                />
                <TextField
                    onChange={e => setHours(e.target.value)}
                    required
                    name="hours"
                    label="Hours (ex. 8AM - 9PM)"
                    type="text"
                />
                <TextField
                    onChange={e => setDescription(e.target.value)}
                    required
                    name="description"
                    label="Description"
                    type="text"
                />
                <Button
                    type="submit"
                    color="primary"
                    className="add-button"
                    variant="contained"
                > Save </Button>
            </form>

            <Container maxWidth="sm">
                <MapContainer center={position} zoom={12} scrollWheelZoom={false} style={{ width: '100%', height: '30rem' }}>
                    <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position} />
                </MapContainer>
            </Container>
        </Container>
    )
}
