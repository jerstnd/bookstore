import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import  Message  from '../components/Message'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function CartScreen({ match, location, history }) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, addToCart])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }



    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>Your cart is empty <Link to='/'>Go back</Link></Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={3}>
                                        ${item.price}
                                    </Col>

                                    <Col md={2}>
                                        <span>  {item.qty}  </span>
                                    </Col>

                                    <Col md={1}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item variant='flush'>
                            <h2>Subtotal</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button type='button' className='w-100' disabled={cartItems.length === 0} onClick={checkoutHandler}>
                            Checkout
                        </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
