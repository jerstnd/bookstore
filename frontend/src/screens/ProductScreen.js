import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom'
import { Row, Col, Image, Button, ListGroup, Card } from 'react-bootstrap'
import  Rating  from '../components/Rating'
import  Loader  from '../components/Loader'
import  Message  from '../components/Message'
import { listProductsDetails } from '../actions/productActions'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";



function ProductScreen({ match, history }) {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(()=> {
        dispatch(listProductsDetails(match.params.id))
    }, [dispatch, match])

    const decrementQty = () => {
        setQty(qty > 1 ? qty - 1 : qty)
    }

    const incrementQty = () => {
        setQty(qty == product.countInStock ? qty : qty + 1)
    }

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            
            {loading ?
                <Loader />
                : error ? 
                    <Message variant='danger'>{error}</Message>
                    :(
                        <Row>
                            <Col md={3}>
                                <Image src={product.image} alt={product.name} />
                            </Col>


                            <Col md={6}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} Reviews`} color={'#f8e825'} />
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <h5>Price: ${product.price}</h5>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>


                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col><strong>${product.price}</strong></Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Stock:</Col>
                                                <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty:</Col>
                                                    <Col>
                                                        <Button variant="light" size="sm" onClick={decrementQty}><AiOutlineMinus /></Button>
                                                        <span>   {qty}   </span>
                                                        <Button variant="light" size="sm" onClick={incrementQty}><AiOutlinePlus /></Button>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>                                       
                                        )}

                                        <ListGroup.Item>
                                            <Button className='w-100' disabled={product.countInStock == 0} type='button' onClick={addToCartHandler}>Add to Cart</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    )
            }

            
        </div>
    )
}

export default ProductScreen
