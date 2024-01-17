const products = [
    {
        "id": 1,
        "title": "Camiseta básica",
        "description": "Camiseta de algodón de manga corta",
        "price": 19.99,
        "thumbnail": "https://imgs.search.brave.com/3MjXrDfb82ocwcAsvd3yKR2RDc2KZTVmOxGlrqPNYZc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFzMVdaRmZEV0wu/anBn",
        "code": "TS001",
        "stock": 50
    },
    {
        "id": 2,
        "title": "Jeans ajustados",
        "description": "Jeans de mezclilla ajustados",
        "price": 39.99,
        "thumbnail": "https://imgs.search.brave.com/7sVpmjxygh8_YXJIcJdC0JUrQiwTAU8Zdft9f5xsDbM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/MjE1NDM3Ny9waG90/by9qZWFucy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VDNL/MV9QZGxaeFhJTEtG/dkdrVG1QaUlmNU0y/RWRJeGtxYTc5QUpU/X3cwWT0",
        "code": "JN002",
        "stock": 30
    },
    {
        "id": 3,
        "title": "Vestido de verano",
        "description": "Vestido ligero perfecto para el verano",
        "price": 29.99,
        "thumbnail": "https://imgs.search.brave.com/1Hrf2vBzRt6v_1JqiM16N1adbYFDE6v3eQePaeZ-rEI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9wYXRw/cmltby52dGV4aW1n/LmNvbS5ici9hcnF1/aXZvcy9pZHMvMTMx/NjE3Mi01NTAtNjYw/L2NhbWlzZXRhcy1w/YXJhLW11amVyLTMw/MDkzMzU2LTYxMzI0/XzEuanBnP3Y9NjM4/MzU3NTEzMzQwOTAw/MDAw",
        "code": "VD003",
        "stock": 20
    },
    {
        "id": 4,
        "title": "Zapatillas deportivas",
        "description": "Zapatillas cómodas para correr",
        "price": 49.99,
        "thumbnail": "https://imgs.search.brave.com/lfCbi8cTGU5icvs611Wal5NmnMlTIv-niO0fx0GIM6k/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL3ZhZGVyLXBy/b2QuczMuYW1hem9u/YXdzLmNvbS8xNzA0/NDU5Njc1LWU1ZjVj/MDE0NDYyZDQxNjA5/NmRlYWQ4YzBkNGE3/MGFjLmpwZz9jcm9w/PTF4dzoxeGg7Y2Vu/dGVyLHRvcCZyZXNp/emU9OTgwOio",
        "code": "ZD004",
        "stock": 40
    },
    {
        "id": 5,
        "title": "Chaqueta de cuero",
        "description": "Chaqueta de cuero sintético con estilo",
        "price": 79.99,
        "thumbnail": "https://imgs.search.brave.com/5GzP48qb2sNN2gB3LTxrm-08HmQmrnnj9NiDsSm2rOE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzcxTlllK2V1NnpM/LmpwZw",
        "code": "CL005",
        "stock": 25
    },
    {
        "id": 6,
        "title": "Sombrero de paja",
        "description": "Sombrero de paja ideal para la playa",
        "price": 14.99,
        "thumbnail": "https://imgs.search.brave.com/8EPLKWYdVXXPffZETOYFheCZGgeciMtLWYfOdUnk4qk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/c29tYnJlcm8tcGFq/YS1ob21icmVfMTIw/My03MjU3LmpwZz9z/aXplPTYyNiZleHQ9/anBn",
        "code": "SH006",
        "stock": 15
    },
    {
        "id": 7,
        "title": "Bufanda tejida",
        "description": "Bufanda cálida y tejida para el invierno",
        "price": 22.99,
        "thumbnail": "https://imgs.search.brave.com/-IlnWPAc2gLy-94LJku858hOA0cvjpNUNyIAAIiY7CE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9scDIu/aG0uY29tL2htZ29l/cHByb2Q_c2V0PXF1/YWxpdHlbNzldLHNv/dXJjZVsvOGEvOWQv/OGE5ZGIzYTFiYzM1/OTVlZGRhYTZhMDYw/MjMxOTVhMzVkZjJl/ZTExMy5qcGddLG9y/aWdpbltkYW1dLGNh/dGVnb3J5W10sdHlw/ZVtERVNDUklQVElW/RVNUSUxMTElGRV0s/cmVzW21dLGhtdmVy/WzJdJmNhbGw9dXJs/W2ZpbGU6L3Byb2R1/Y3QvbWFpbl0.jpeg",
        "code": "BF007",
        "stock": 35
    },
    {
        "id": 8,
        "title": "Bolso de mano",
        "description": "Bolso elegante para ocasiones especiales",
        "price": 34.99,
        "thumbnail": "https://imgs.search.brave.com/NNjVu0qzvnx91fmuBdvEMm90MT4bzH8JcUByjR18sQ4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9wcnVu/ZWNvbXB5LnMzLmFt/YXpvbmF3cy5jb20v/dXBsb2Fkcy8yMDIz/LzExL1BJMDMzNjNQ/MEFJMjAwMC1CT0xT/Ty1USEUtUEFURU5U/LUVGRUNUTy1DVUVS/Ty1OQVRVUkFMLTEu/d2VicA",
        "code": "BG008",
        "stock": 18
    },
    {
        "id": 9,
        "title": "Calcetines coloridos",
        "description": "Calcetines divertidos y coloridos",
        "price": 9.99,
        "thumbnail": "https://imgs.search.brave.com/RhGu5sYOWozuPHzc6kUNFQZ9yoXkT0NMQ-rXXBbNuIM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcw/MS56dGF0Lm5ldC9h/cnRpY2xlL3NwcC1t/ZWRpYS1wMS8zOWVh/ZmI1ZDczODQ0MWY2/YTE4M2MzMGU1N2M0/ZWNiZC9hYjQyNDk2/NDUxOTQ0NDc2YTlk/OTIzYmJjNmU4ZDQw/NC5qcGc_aW13aWR0/aD0zMDAmZmlsdGVy/PXBhY2tzaG90",
        "code": "CS009",
        "stock": 50
    },
    {
        "id": 10,
        "title": "Gafas de sol",
        "description": "Gafas de sol con protección UV",
        "price": 29.99,
        "thumbnail": "https://imgs.search.brave.com/-Lol742Jp7DG_S1DGRhTvUqa10BVqz-vYAdH4zS-Ywk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF83/NDAzMzQtTUxBNTMx/Njg4NDM1MzVfMDEy/MDIzLVcud2VicA",
        "code": "GS010",
        "stock": 22
    }
];

export default products;