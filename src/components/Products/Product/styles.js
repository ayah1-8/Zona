import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  media: {
    height: 230,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Arial',
    fontStyle: 'bold',
    textAlign: 'center',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));
