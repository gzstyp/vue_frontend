const storage = {
    setJson(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    getJson(key){
        return localStorage.getItem(key)?JSON.parse(localStorage.getItem(key)):null;
    },
    set(key,value){
        localStorage.setItem(key,value);
    },
    get(key){
        return localStorage.getItem(key)?localStorage.getItem(key).replace('"','').replace('"',''):"";
    },
    remove(key){
        localStorage.removeItem(key);
    }
}
export default storage;