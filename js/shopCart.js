let vm1 = new Vue({
    el: '#shopCart',
    created(){
        // this.getProductList();
    },
    data: {
        isAll: false,
        list: [
            {
                "id": 1,
                "name": "iphone7",
                "price": 6188,
                "count": 1,
                checked: true
            },
            {
                "id": 2,
                "name": "ipad pro",
                "price": 5888,
                "count": 1,
                checked: true
            },
            {
                "id": 3,
                "name": "MackBook Pro",
                "price": 21488,
                "count": 1,
                checked: false
            }
        ]
    },
    computed: {
        totalPrice() {
            let price = this.list.filter(item => {
                return item.checked;
            }).reduce((acc, cur) => {
                return acc + cur.price * cur.count;
            }, 0);
            return price.toString().replace(/\B(?=(\d{3})+$)/g, ', ');
        },
    },
    methods: {
        handleReduce(index) {
            if (this.list[index].count <= 1) return;
            this.list[index].count--;
        },
        handleAdd(index) {
            this.list[index].count++;
        },
        handleRemove(index) {
            this.list.splice(index, 1);
        },
        write(index) {
            console.log(this.list[index].checked)
        },
        getAll() {
            this.list.forEach(item => {
                item.checked = this.isAll;
            });
        },
        checkEach() {
            this.isAll = this.list.every(item => {
                return item.checked;
            });
        },
        getProductList(){
            axios.get('./json/shopCart.json',{}).then(res=>{
                this.list = res.data;
            });
        }
    }
});
