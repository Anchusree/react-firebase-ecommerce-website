import fb from './fb'

const db = fb.firestore()

//all database functionality
class DB{
    constructor(collection){
        this.collection = collection
    }
    reformat(doc){
        return {id:doc.id, ...doc.data()}
    }
    
    findAll = async () => {
        const data = await db.collection(this.collection).get()
        return data.docs.map(this.reformat)
    }

    findByField = async (field, value) => {
        const data = await db.collection(this.collection).where(field, '==', value).get()
        return data.docs.map(this.reformat)
    }
    listenAll = set =>
    db.collection(this.collection).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    findOne = async id => {
    const doc = await db.collection(this.collection).doc(id).get()
    return doc.exists ? this.reformat(doc) : undefined
    }


    listenOne = (set, id) =>
    db.collection(this.collection).doc(id).onSnapshot(snap => set(this.reformat(snap)))

    // item has no id
    create = ({ id, ...rest }) =>
    db.collection(this.collection).add(rest)

    // item has id
    update = ({ id, ...rest }) =>
    db.collection(this.collection).doc(id).set(rest)

    remove = id =>
    db.collection(this.collection).doc(id).delete()

    }
    
    class Category extends DB {

        constructor() {
            super('category')
        }
        listenToCategoryCount = set =>
        db.collection(this.collection).onSnapshot(snap => set(snap.docs.length))

    }

    class Users extends DB {

        constructor() {
            super('user')
            this.Wishlist = new Wishlist(this.collection)
            this.Carts = new Carts(this.collection)
        }
        
        findByRole = role =>
            this.findByField('role', role)
    
        updateProfile = (userId, { ...rest }) =>
            db.collection(this.collection).doc(userId).set(rest)
        
        listenToCustomerCount = (set, user) =>
        db.collection(this.collection).where("role", "==", user).onSnapshot(snap => set(snap.docs.map(this.reformat)))
    }

    class Carts extends DB{
        constructor(containing){
        super('carts')
        this.containing = containing
        }
        reformat(doc) {
            //console.log('reformat auctions', doc.data())
           return { ...super.reformat(doc), orderDate: doc.data().orderDate.toDate().toDateString()}
        }
        createUserCartItem = (userId,{id,...rest})=>{
            db.collection(this.containing).doc(userId).collection(this.collection).add(rest)
        }
        listenToOneUserAllCartItems = (set, userId) =>
        db.collection(this.containing).doc(userId).collection(this.collection).onSnapshot(snap => set(snap.docs.map(this.reformat)))

        removeUserCartItems = (userId, cartItemId) =>
        db.collection(this.containing).doc(userId).collection(this.collection).doc(cartItemId).delete()

        findOneUserAllCartItems = async userId => {
            const data = await db.collection(this.containing).doc(userId).collection(this.collection).get()
            return data.docs.map(this.reformat)
        }
        updateCartItem = (userId, { id, ...rest }) =>
        db.collection(this.containing).doc(userId).collection(this.collection).doc(id).set(rest)

        listenToUserCartItem = (set, userId, cartId) =>
        db.collection(this.containing).doc(userId).collection(this.collection).doc(cartId).onSnapshot(snap => set(this.reformat(snap)))

        listenToAllUsersAllItems = set =>
        db.collectionGroup(this.collection).onSnapshot(snap => set(snap.docs.map(this.reformat)))
    }

   
    class Wishlist extends DB{
        constructor(containing){
        super('wishlist')
        this.containing = containing
        }
        reformat(doc) {
           return { ...super.reformat(doc)}
        }
        createUserWishlist = (userId,{id,...rest})=>{
            db.collection(this.containing).doc(userId).collection(this.collection).add(rest)
        }
        listenToOneUserAllWishlist = (set, userId) =>
        db.collection(this.containing).doc(userId).collection(this.collection).onSnapshot(snap => set(snap.docs.map(this.reformat)))

        removeUserWishlist = (userId, wishlistId) =>
        db.collection(this.containing).doc(userId).collection(this.collection).doc(wishlistId).delete()

        findOneUserAllItems = async userId => {
            const data = await db.collection(this.containing).doc(userId).collection(this.collection).get()
            return data.docs.map(this.reformat)
        }
        updateItem = (userId, { id, ...rest }) =>
        db.collection(this.containing).doc(userId).collection(this.collection).doc(id).set(rest)
       
    }
    class Review extends DB{
        constructor(containing){
        super('review')
        this.containing = containing
        }
        reformat(doc) {
            return { ...super.reformat(doc), reviewDate: doc.data().reviewDate.toDate().toDateString()}
        }
        createProductReview = (productId,{id,...rest})=>{
            db.collection(this.containing).doc(productId).collection(this.collection).add(rest)
        }
        listenToOneUserAllComments=(set,productid,userId)=>
            db.collection(this.containing).doc(productid).collection(this.collection).where('userId','===', userId).onSnapshot(snap=>set(snap.docs.map(this.reformat)))
        
        listenToOneProductAllComments = (set, productId) =>
            db.collection(this.containing).doc(productId).collection(this.collection).onSnapshot(snap => set(snap.docs.map(this.reformat)))

        removeProductReview = (productId, reviewId) =>
             db.collection(this.containing).doc(productId).collection(this.collection).doc(reviewId).delete()

        updateComment = (productId, { id, ...rest }) =>
             db.collection(this.containing).doc(productId).collection(this.collection).doc(id).set(rest)
        
        listenToAllProductsAllReviews = set =>
             db.collectionGroup(this.collection).onSnapshot(snap => set(snap.docs.map(this.reformat)))
      }

    class Products extends DB {

        constructor() {
            super('products')
            this.Review = new Review(this.collection)
        }
        listenByCategoryId = (set, categoryId) =>
        db.collection(this.collection).where('categoryId', '==', categoryId).onSnapshot(snap => set(snap.docs.map(this.reformat)))

        listenByProductId = (set, productId) =>
        db.collection(this.collection).where('id', '==', productId).onSnapshot(snap => set(snap.docs.map(this.reformat)))

    }
    class Ads extends DB {

        constructor() {
            super('ads')
        }
      
    }
    class Shipping extends DB {

        constructor() {
            super('shipping')
        }
        reformat(doc) {
            return { ...super.reformat(doc), shipmentDate: doc.data().shipmentDate.toDate().toDateString()}
        }
        listenByUserId = (set, userId) =>
        db.collection(this.collection).where('userId', '==', userId).onSnapshot(snap => set(snap.docs.map(this.reformat)))
      
    }
    class Faq extends DB {

        constructor() {
            super("Faq")
        }
        updatefaq = (id, { ...rest }) =>
            db.collection(this.collection).doc(id).set(rest)
    
        removequestion = (questionId) =>
            db.collection(this.collection).doc(questionId).delete()

        listenByUserId = (set, userId) =>
            db.collection(this.collection).where('userId', '==', userId).onSnapshot(snap => set(snap.docs.map(this.reformat)))
    }


    class Payment extends DB{
        constructor(){
            super('payment')
        }
        reformat(doc) {
            //console.log('reformat auctions', doc.data())
            return { ...super.reformat(doc),expiryDate:doc.data().expiryDate.toDate().toDateString(),
                 paymentDate: doc.data().paymentDate.toDate().toDateString()}
        }
        listenByUserId = (set, userId) =>
        db.collection(this.collection).where('userId', '==', userId).onSnapshot(snap => set(snap.docs.map(this.reformat)))
    }




export default {
    Users: new Users(),
    Category : new Category(),
    Products: new Products(),
    Ads: new Ads(),
    Faq :new Faq(),
    Shipping: new Shipping(),
    Payment : new Payment()
};