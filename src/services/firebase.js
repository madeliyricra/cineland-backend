const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase.json");

const FIREBASE_PRIVATE_KEY_ID = process.env.FIREBASE_PRIVATE_KEY_ID
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL
const FIREBASE_CLIENT_ID = process.env.FIREBASE_CLIENT_ID
console.log('FIREBASE_PRIVATE_KEY_ID', FIREBASE_PRIVATE_KEY_ID);
console.log('FIREBASE_PRIVATE_KEY', FIREBASE_PRIVATE_KEY);
const credential = {
    ...serviceAccount,
    private_key_id: FIREBASE_PRIVATE_KEY_ID,
    private_key: FIREBASE_PRIVATE_KEY,
    client_email: FIREBASE_CLIENT_EMAIL,
    client_id: FIREBASE_CLIENT_ID,
}

admin.initializeApp({
    credential: admin.credential.cert(credential),
})

const getPremieresFromFirestore = async () => {
    try {
        const db = admin.firestore();
        const premiersSnapshot = await db.collection("premiers").get();

        if (premiersSnapshot.empty) {
            return { message: "No hay estrenos disponibles", data: [] };
        }

        const premiersData = premiersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return { message: "Estrenos obtenidos con éxito", data: premiersData };
    } catch (error) {
        console.error("Error al obtener estrenos:", error);
        throw new Error("Error al conectar con Firestore")

    }
};

const getCandiesFromFirestore = async () => {
    try {
        const db = admin.firestore();
        const candiesSnapshot = await db.collection("candies").get();

        if (candiesSnapshot.empty) {
            return { message: "No hay dulces disponibles", data: [] };
        }

        const candiesData = candiesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return { message: "Dulces obtenidos con éxito", data: candiesData };
    } catch (error) {
        console.error("Error al obtener dulces:", error);
        throw new Error("Error al conectar con Firestore");
    }
}

const postOrderToFirestore = async (order) => {
    try {
        const db = admin.firestore();
        const ordersCollection = db.collection("orders");
        const newOrderRef = await ordersCollection.add(order);
        return { message: "Orden creada con éxito", orderId: newOrderRef.id };
    } catch (error) {
        console.error("Error al crear la orden:", error);
        throw new Error("Error al conectar con Firestore");
    }
};

const getOrderByIdFromFirestore = async (orderId) => {
    try {
        const db = admin.firestore();
        const orderRef = db.collection("orders").doc(orderId);
        const orderSnapshot = await orderRef.get();

        if (!orderSnapshot.exists) {
            return { message: "Orden no encontrada", data: null };
        }

        const orderData = { id: orderSnapshot.id, ...orderSnapshot.data() };
        return { message: "Orden obtenida con éxito", data: orderData };
    } catch (error) {
        console.error("Error al obtener la orden:", error);
        throw new Error("Error al conectar con Firestore");
    }
}

module.exports = { getPremieresFromFirestore, getCandiesFromFirestore, postOrderToFirestore, getOrderByIdFromFirestore };