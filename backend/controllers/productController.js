import pool from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM products
            ORDER BY created_at DESC`);
    console.log("datafetched");
    res.status(200).json({ success: true, data: rows });
  } catch (e) {
    console.error("Error fetching products:", e);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "all fields are required" });
  }
  try {
    const { rows } = await pool.query(
        `INSERT INTO products (name, price, image) VALUES ($1, $2, $3) RETURNING *`,
        [name, price, image]
      );
    return res.status(201).json({ success: true, data: rows[0] });
  } catch (e) {
    console.error("SQL Error:", e.message);
    console.error("Stack Trace:", e.stack);

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  try {
    const { rows } = await pool.query(`UPDATE products
    SET name=$1, price=$2,image=$3 WHERE id = $4
    RETURNING *`,[name,price,image,id]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }
    return res.status(200).json({ success: true, data: rows[0] });
  } catch (e) {
    console.error("SQL Error:", e.message);
    console.error("Stack Trace:", e.stack);

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT * FROM products WHERE id = ${id}`
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }
    return res.status(200).json({ success: true, data: rows[0] });
  } catch {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const { rows } = await pool.query(
        `DELETE FROM products WHERE id = ${id} RETURNING *`
      );
      if (rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "product not found" });
      }
      return res.status(200).json({ success: true, data: rows[0] });
    } catch {
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
