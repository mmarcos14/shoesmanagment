<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
     integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" 
    crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="'app.css'">
    <title>Document</title>
    <style>
        /* Conteneur de l'image */
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Style de l'image */
.styled-image {
  width: 100%;
  max-width: 1000px; /* Taille maximale */
  height: 300px; /* Conserver les proportions */
  border-radius: 12px; /* Coins arrondis */
  object-fit: cover; /* Couper et ajuster */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Ombre */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Effet au survol */
.styled-image:hover {
  transform: scale(2); /* Zoom léger */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.3); /* Ombre augmentée */
}

    </style>
</head>
@viteReactRefresh
@vite('resources/js/app.js')
<body style="background-color:blackv">
    <div id="root"></div>
</body>
</html>