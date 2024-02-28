import Mongoose from 'mongoose';
const {Schema,model} =Mongoose;
import fs from 'fs';
import path from 'path';


let imageSchema = new Schema({
	title: String,
	path: String,
    idAssociated: String
},{
    timestamps: true,
    versionKey: false
});

imageSchema.pre('remove', async function() {
    try {
        // Obtener la ruta del archivo
        const filePath = path.join(this.path);

        // Verificar si el archivo existe
        if (fs.existsSync(filePath)) {
            // Eliminar el archivo
            fs.unlinkSync(filePath);
            console.log(`Archivo ${this.path} eliminado exitosamente`);
        } else {
            console.log(`El archivo ${this.path} no existe en la carpeta uploads`);
        }
    } catch (error) {
        // Manejar errores
        console.error('Error al borrar dependencias:', error);
    }
});


let Image = model('Image',imageSchema);

export default Image = Image;
