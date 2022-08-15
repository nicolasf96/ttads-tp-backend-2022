# ttads-tp-backend-2022
TP Backend para materia TTADS 2022 - UTN FRRo

| Nombre         |    Legajo     |         mail          |
|----------------|:-------------:|----------------------:|
| Nicolás Fierro |     43908     | nicofierro1@gmail.com |

## Enunciado general del tp:
En el siguiente TP se va a realizar un directorio de Negocios (Listing) donde un
usuario puede registrarse en la web app y publicar su negocio cargándole todos los datos
de contacto, fotos, productos e información importante y asignando su negocio a una
categoría determinada (Las categorías ya están determinadas por default). Cada negocio
tendrá su valoración (número del 1 al 5), lo cuál consta en que los distintos usuarios podrán
dejar un review de los distintos negocios del directorio siempre y cuando estén logueados.
Un usuario podrá buscar negocios aplicando filtros, por ejemplo, filtro por ciudad, por
categoría, por nombre, por palabras clave, para poder obtener toda la información de éstos.
La idea del directorio se enfoca en crear una base de datos donde se junte toda la
información del negocio y además muestre sus productos destacados (simulando una
tienda sin pagos).
### (Idea 1 - User Story)
Los usuarios que administren negocios podrán crear un ‘link presentación’ donde
puedan publicar y compartir en la bio de sus redes (como instagram) de manera rápida su
perfil, links importantes, redes e información. Similar a “más links”.
### (Idea 2 - User Story)
Los usuarios que administren negocios podrán crear ‘campañas’ (informar una oferta
o un producto nuevo, por ejemplo) que consten de una imagen y una breve descripción que
se incluirán en su perfil de negocio como publicidad y además podrán enviarlas mediante
correo electrónico a los usuarios que hayan valorado su negocio.
### ABMC SIMPLE:
Entidad -> User
Atributos -> (email, username, password, firstname, last_name, phone)
### ABMC DEPENDIENTE:
Entidad -> Product
Atributos -> (title, description, location, used, price, unit, unitOM, store, images)
### LISTADO SIMPLE:
Listar todos los negocios publicados en el directorio, mostrando datos importantes.
### LISTADO COMPLEJO:
Listar todos los negocios publicados en el directorio aplicando un filtro según Keyword que contenga el nombre o en sus tags
### DETALLE BÁSICO:
Mostrar todos los datos referidos a un negocio. Entidades involucradas -> Store,
User, Cathegory, Image


Diagrama Entidad Realción - DER: tp backend der ttads.pdf
https://drive.google.com/file/d/1A7xhPxWpqQle38Tq_vT0nWGemIFfXnib/view?usp=sharing
