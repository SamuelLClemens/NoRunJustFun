// Back-compat shim. The Money Garden hub + completion screens now live in the
// generic learning UI (js/learning-screen.js), driven by the track registry.
// These thin re-exports bind them to the 'money' track. New code should call
// trackHubScreen('money') / learningDone('money', plan) directly.

import { trackHubScreen, learningDone } from './learning-screen.js';

export const moneyGardenScreen = () => trackHubScreen('money');
export const financeDone = (plan) => learningDone('money', plan);
