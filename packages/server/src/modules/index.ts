import { Router } from 'express';
// import { buildRouter as buildAuthRouter } from './auth';
// import { buildRouter as buildUserRouter } from './user';
// import { buildRouter as buildTeamRouter } from './team';

export function buildRouter(): Router {
  const router = Router();

  // router.use('/auth', buildAuthRouter());
  // router.use('/users', buildUserRouter());
  // router.use('/teams', buildTeamRouter());

  return router;
}
