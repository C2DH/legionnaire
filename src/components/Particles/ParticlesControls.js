import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const ParticlesControls = ({
    src,
    size      = 1,
    space     = 0,
    scale     = 1,
    radius    = 64,
    opacity   = 1,
    shaker    = false,
    hold      = false,
    count     = 0,
    frameRate = 0,
    imagesSrc = [],
    onChange
  }) => {

  return (
    <Form className="ParticlesControls">
      <Row className="align-items-center">
        <Form.Label column>Particles</Form.Label>
        <Col>{count.toLocaleString()}</Col>
      </Row>
      <Row className="align-items-center">
        <Form.Label column>Framerate</Form.Label>
        <Col>{frameRate} fps</Col>
      </Row>
      <Row className="align-items-center">
        <Form.Label column>Images</Form.Label>
        <Col>
          <Form.Control
            as        = "select"
            value     = {src}
            onChange  = {e => onChange('src', e.target.value)}
          >
            {Object.entries(imagesSrc).map(([type, src]) =>
              <option key={type} value={src}>{type}</option>
            )}
          </Form.Control>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Form.Label column>Size ({size}px)</Form.Label>
        <Col>
          <Form.Range
            value     = {size}
            min       = "1"
            max       = "5"
            onChange  = {e => onChange('size', parseInt(e.target.value))}
          />
        </Col>
      </Row>
      <Row className="align-items-center">
        <Form.Label column>Space ({space}px)</Form.Label>
        <Col>
          <Form.Range
            value     = {space}
            min       = "0"
            max       = "4"
            onChange  = {e => onChange('space', parseInt(e.target.value))}
          />
        </Col>
      </Row>
      <Row className="align-items-center">
        <Form.Label column>Scale ({scale * 100}%)</Form.Label>
        <Col>
          <Form.Range
            value     = {scale}
            min       = {0.5}
            max       = {2}
            step      = {0.25}
            onChange  = {e => onChange('scale', parseFloat(e.target.value))}
          />
        </Col>
      </Row>
      <Row className="align-items-center">
        <Form.Label column>Radius ({radius}px)</Form.Label>
        <Col>
          <Form.Range
            value     = {radius}
            min       = {16}
            max       = {128}
            step      = {16}
            onChange  = {e => onChange('radius', parseInt(e.target.value))}
          />
        </Col>
      </Row>
      <Row className="align-items-center">
        <Form.Label column>Opacity ({opacity})</Form.Label>
        <Col>
          <Form.Range
            value     = {opacity}
            min       = {0}
            max       = {1}
            step      = {0.2}
            onChange  = {e => onChange('opacity', parseFloat(e.target.value))}
          />
        </Col>
      </Row>
        <Form.Check
          id        = "shaker"
          label     = "Shaker on start"
          checked   = {shaker}
          onChange  = {e => onChange('shaker', e.target.checked)}
        />
        <Form.Check
          id        = "hold"
          label     = "Hold touching"
          checked   = {hold}
          onChange  = {e => onChange('hold', e.target.checked)}
        />
    </Form>
  );
};

export default ParticlesControls;
