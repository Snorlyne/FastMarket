// src/data/ofertasMockData.ts
import { IOferta } from "../interfaces/IOferta";

export const ofertasMockData: any[] = [
  {
    Id: 1,
    idPersona: 101,
    idAnuncio: 501,
    monto: 2500,
    fecha_oferta: new Date("2023-10-01T14:30:00"),
    estado: "Activo",
    tipo: "Oferta",
    anuncio: {
      Id: 501,
      fecha_expiracion: new Date("2023-12-01T00:00:00"),
      Estado: "Publicado",
      precio_anuncio: 3000,
      producto: {
        id: 301,
        nombre: "Bicicleta de Montaña",
        precio: 3000,
        cantidad: 1,
        tipo: "Deporte",
        fotos: [
          { id: 1001, url: "https://firebasestorage.googleapis.com/v0/b/fastmarket-b082d.appspot.com/o/productosFM%2Flaptop_183544.jpg?alt=media&token=0170a0bd-4443-42b9-8c98-fb3d23d32643" },
          { id: 1002, url: "https://firebasestorage.googleapis.com/v0/b/fastmarket-b082d.appspot.com/o/productosFM%2Flaptop_183544.jpg?alt=media&token=0170a0bd-4443-42b9-8c98-fb3d23d32643" }
        ],
      }
    },
    producto: [
      {
        id: 301,
        nombre: "Bicicleta de Montaña2",
        precio: 3000,
        cantidad: 1,
        tipo: "Deporte",
        fotos: [
          { id: 1001, url: "https://firebasestorage.googleapis.com/v0/b/fastmarket-b082d.appspot.com/o/productosFM%2Flaptop_183544.jpg?alt=media&token=0170a0bd-4443-42b9-8c98-fb3d23d32643" },
          { id: 1002, url: "https://firebasestorage.googleapis.com/v0/b/fastmarket-b082d.appspot.com/o/productosFM%2Flaptop_183544.jpg?alt=media&token=0170a0bd-4443-42b9-8c98-fb3d23d32643" }
        ],
      },
      {
        id: 302,
        nombre: "Bicicleta de Montaña3",
        precio: 3000,
        cantidad: 1,
        tipo: "Deporte",
        fotos: [
          { id: 1001, url: "https://firebasestorage.googleapis.com/v0/b/fastmarket-b082d.appspot.com/o/productosFM%2Flaptop_183544.jpg?alt=media&token=0170a0bd-4443-42b9-8c98-fb3d23d32643" },
          { id: 1002, url: "https://firebasestorage.googleapis.com/v0/b/fastmarket-b082d.appspot.com/o/productosFM%2Flaptop_183544.jpg?alt=media&token=0170a0bd-4443-42b9-8c98-fb3d23d32643" }
        ],
      },
    ]
  },
  {
    Id: 2,
    idPersona: 102,
    idAnuncio: 502,
    monto: 1200,
    fecha_oferta: new Date("2023-10-02T10:45:00"),
    estado: "Rechazada",
    tipo: "Oferta",
    anuncio: {
      Id: 502,
      fecha_expiracion: new Date("2023-11-10T00:00:00"),
      Estado: "Publicado",
      precio_anuncio: 1500,
      producto: {
        id: 302,
        nombre: "Teléfono Móvil",
        precio: 1500,
        cantidad: 1,
        tipo: "Electrónica",
        fotos: [
          { id: 1003, Url: "https://example.com/phone1.jpg" }
        ],
      }
    },
    producto: [
      {
        id: 302,
        nombre: "Teléfono Móvil2",
        precio: 1500,
        cantidad: 1,
        tipo: "Electrónica",
        fotos: [
          { id: 1003, Url: "https://example.com/phone1.jpg" }
        ],
      }
    ]
  }
];
