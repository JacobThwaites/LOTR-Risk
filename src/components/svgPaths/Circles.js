import CircleGenerator from '../../utils/CircleGenerator';

function Circles(props) {
    let circles = '';
    
    if (props.isMapRendered) {
        const circleGenerator = new CircleGenerator();
        circles = circleGenerator.generateCircles();
    }

    return circles;
}

export default Circles;