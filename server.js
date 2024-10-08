// const http ga usah karena pakai express
const express = require("express");

const { product } = require("./models");

const app = express();

// middleware untuk membaca json dari request body(client, FE dll) ke kita
app.use(express.json());

// default URL = Health check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Application is running...",
  });
});

// mengambil data semua product dari database dengan findAll()
app.get("/api/v1/products", (req, res) => {
  product.findAll().then((products) => {
    res.status(200).json({
      status: "success",
      message: "Success get cars data !",
      isSuccess: true,
      total: products.length,
      data: {
        products,
      },
    });
  });
});

// mengambil data product sesuai dengan id
app.get("/api/v1/products/:id", (req, res) => {
  const findId = req.params.id * 1;
  console.log(findId);

  product
    .findOne({
      where: {
        id: findId,
      },
    })
    .then((products) => {
      res.status(200).json({
        status: "success",
        message: "Success get cars data !",
        isSuccess: true,
        total: products.length,
        data: {
          products,
        },
      });
    });
});

// menambahkan data pada tabel products
app.post("/api/v1/products", (req, res) => {
  product.create(req.body).then((products) => {
    res.status(200).json({
      status: "success",
      message: "Success get cars data !",
      isSuccess: true,
      data: {
        products,
      },
    });
  });
});

app.patch("/api/v1/products/:id", (req, res) => {
  const findId = req.params.id * 1;
  product
    .update(req.body, {
      where: {
        id: findId,
      },
    })
    .then((products) => {
      res.status(200).json({
        status: "success",
        message: "Success update product data !",
        isSuccess: true,
        data: null,
      });
    });
});

app.delete("/api/v1/products/:id", (req, res) => {
  const findId = req.params.id * 1;
  console.log(findId);

  product
    .destroy({
      where: {
        id: findId,
      },
    })
    .then((products) => {
      res.status(200).json({
        status: "success",
        message: "Success delete product data !",
        isSuccess: true,
        data: null,
      });
    });
});

// // salah satu basic error handling
// if (!car) {
//   console.log("gak ada data");
//   // return agar berhenti membaca respon bawahnya
//   return res.status(404).json({
//     status: "Failed",
//     message: `Failed get car data this : ${id}`,
//     isSuccess: false,
//     data: null,
//   });
// }

// middleware / handler untuk url yang tidak dapat diakses karena memang tidak ada di apklikasi
// membuat middleware = our own middleware
app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "API not exist !!!",
  });
});

app.listen("3000", () => {
  console.log("start aplikasi di port 3000");
});
