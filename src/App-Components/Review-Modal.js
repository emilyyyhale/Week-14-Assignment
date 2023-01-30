import React, { useState, useRef } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ReactStars from "./Star-Rating";
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

export default function ReviewModal(props) {
    const [show, setShow] = useState(false);
    const [reviewList, setReviewList] = useState([
      {
            id: 1,
            name: 'Test 1',
            info: 'First test of the review form!',
            star: '5★',
        },
      {
            id: 2,
            name: 'Test 2',
            info: 'This is test review number 2.',
            star: '1★',
        }
    ]);

  const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const name = useRef(null);
    const info = useRef(null);
    let starRating = [];

    const changedStarRating = (newStarRating) => {
        let newRating = `${newStarRating} ★`;
        starRating.push(newRating)
    }

  //Saves the review into the list
    function saveNewReviewButton() {
        setReviewList(current => [...current, {
            name: name.current.value,
            info: info.current.value,
            star: starRating[starRating.length-1]
        }]);
        name.current.value = '';
        info.current.value = '';
        starRating = [];
    }

  //Creates the reviews for display
  function AllReviews() {
        const itemList = reviewList.map((review) => (
          <>
            <hr></hr>
            <ListGroup variant="flush">
              <ListGroupItem  variant="success">{review.name}</ListGroupItem>
              <ListGroupItem  variant="info">{review.info}</ListGroupItem>
              <ListGroupItem variant="warning"> {review.star}</ListGroupItem>
           </ListGroup>
          </>
        ));

        return (
          <div>
            {itemList}
          </div>
        );
    }

//Modal I found to enter a review
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Movie Reviews
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Review Form for {props.movieTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="reviewForm">
            <Form.Group className="mb-3">
              <Form.Control ref={name} type="text" placeholder="Name" />
            </Form.Group>
            <Form.Group
              className="mb-4"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Write your review here"
                ref={info}
              />

              <ReactStars count={5} size={20} onChange={changedStarRating} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveNewReviewButton}>
            Submit Review
          </Button>
        </Modal.Footer>
        <h3 className="text-center">
          <b><strong>Reviews</strong></b>
        </h3>
        <div>
          <AllReviews key={reviewList.id} />
        </div>
      </Modal>
    </>
  );
}
