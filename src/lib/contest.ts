import { db } from '../db';
import { contest } from '../db/schema';
import { eq } from 'drizzle-orm';

export type ContestStatus = 'idle' | 'open' | 'closed';

const CONTEST_ID = 1;

export function contestStatus(): ContestStatus {
  const row = db.select({ s: contest.status }).from(contest).where(eq(contest.id, CONTEST_ID)).all()[0];
  const s = row?.s;
  return s === 'open' || s === 'closed' ? s : 'idle';
}
