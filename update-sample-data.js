const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'pms_dashboard',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

async function updateSampleData() {
  try {
    console.log('Updating sample data to current dates...');
    
    // Update quality data to current month
    await pool.query(`
      UPDATE quality SET 
        date = '2025-08-01',
        month = 'Aug-25'
      WHERE id = 1
    `);
    
    await pool.query(`
      UPDATE quality SET 
        date = '2025-08-15',
        month = 'Aug-25'
      WHERE id = 2
    `);
    
    // Update delivery data to current month
    await pool.query(`
      UPDATE delivery SET 
        order_date = '2025-08-01',
        month = 'Aug-25',
        estimated_ship_date = '2025-08-31',
        actual_ship_date = '2025-08-31',
        ship_month = 'Aug-25'
      WHERE id = 1
    `);
    
    await pool.query(`
      UPDATE delivery SET 
        order_date = '2025-08-10',
        month = 'Aug-25',
        estimated_ship_date = '2025-09-10',
        actual_ship_date = '2025-09-12',
        ship_month = 'Sep-25'
      WHERE id = 2
    `);
    
    // Update employability data to current month
    await pool.query(`
      UPDATE employability SET 
        date = '2025-08-01',
        month = 'Aug-25'
      WHERE id = 1
    `);
    
    await pool.query(`
      UPDATE employability SET 
        date = '2025-08-15',
        month = 'Aug-25'
      WHERE id = 2
    `);
    
    console.log('Sample data updated successfully!');
    
    await pool.end();
  } catch (error) {
    console.error('Error updating sample data:', error);
    process.exit(1);
  }
}

updateSampleData();