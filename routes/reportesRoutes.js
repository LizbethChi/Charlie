import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.render('reportes');
});

export default router;
   