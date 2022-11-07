import { Router } from 'express';
import { NotFoundError } from '../errors/index.js';
import { auth } from '../middlewares/auth.js';
import {
  login,
  register,
  readOne,
} from '../controllers/users.js';
import {
  celebrateBodyAuth,
  celebrateBodyUser,
  celebrateParamsRouteMe,
} from '../validators/users.js';

// у вас это будет 'routes/auth.js'
const authRouter = Router();
authRouter.post('/signin', celebrateBodyAuth, login);
authRouter.post('/signup', celebrateBodyUser, register);

// у вас это будет 'routes/users.js'
const userRouter = Router();
userRouter.get('/:id', celebrateParamsRouteMe, readOne);

// то, что останется в этом файле
export const router = Router();

router.use('/', authRouter);
router.use(auth); // все роуты ниже будут с авторизацией
router.use('/users', userRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});
