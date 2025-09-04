import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    query,
    setDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { getUid } from "./auth";
import type { IOrder } from "../store/orderSlice";
import type { ISignature } from "../store/signatureSlice";

const userCollection = () => {
    const uid = getUid();
    if (!uid) throw new Error("No auth user");
    return { uid, base: `users/${uid}` };
};

export const subscribeOrders = (
    handler: (orders: Record<string, IOrder>) => void
) => {
    const { base } = userCollection();
    const q = query(collection(db, `${base}/orders`));
    return onSnapshot(
        q,
        (snap) => {
            const data: Record<string, IOrder> = {};
            snap.forEach((d) => {
                const value = d.data() as IOrder;
                data[value.id] = value;
            });
            handler(data);
        },
        (error) => {
            // Surface permission errors in console for easier debugging
            // eslint-disable-next-line no-console
            console.error("Firestore subscribeOrders error:", error);
        }
    );
};

export const upsertOrder = async (order: IOrder) => {
    const { base } = userCollection();
    await setDoc(doc(db, `${base}/orders`, order.id), order, { merge: true });
};

export const deleteOrder = async (orderId: string) => {
    const { base } = userCollection();
    await deleteDoc(doc(db, `${base}/orders`, orderId));
};

const SIGNATURE_DOC_ID = "current";

export const getSignature = async (): Promise<ISignature | null> => {
    try {
        const { base } = userCollection();
        const d = await getDoc(doc(db, `${base}/signatures`, SIGNATURE_DOC_ID));
        return d.exists() ? (d.data() as ISignature) : null;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Firestore getSignature error:", error);
        return null;
    }
};

export const setSignature = async (signature: ISignature) => {
    const { base } = userCollection();
    await setDoc(doc(db, `${base}/signatures`, SIGNATURE_DOC_ID), signature, {
        merge: true,
    });
};
