import { MOVE_PLAYER_ONE } from '../actions/player'
import { WIDTH, HEIGHT } from "../components/PlayingFieldContainer";


const playerOne = {
    positionX: WIDTH / 5,
    positionY: HEIGHT / 2,
    mass: 15,
    velocityX: 0,
    velocityY: 0,
    frictionX: 1,
    frictionY: 1,
    acceleration: 1
};

export default (state = playerOne, action = {}) => {
    switch (action.type) {
        case MOVE_PLAYER_ONE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}