import { Pool } from 'pg';

const pool = new Pool({
  user: 'root',
  host: 'elbrus.liara.cloud',
  database: 'postgres',
  password: 'nebMFvocqyrgIrc00If4HFHx',
  port: 34382,
});

export default pool;
