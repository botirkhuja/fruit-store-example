'use strict';

angular
    .module('fruitStoreApp')
    .component('shoppingCartPage', {
        templateUrl: './shopping-cart-page/shopping-cart-page.template.html',
        controller: ['CartService',
            function ShoppingCartPageController(CartService) {
                var self = this;

                this.$onInit = function () {
                    self.cartItems = CartService.cartItems;
                    self.cartTotal = 0;
                }
                

                self.onIcrementItemQuantity = onIcrementItemQuantity;
                self.onDecrementItemQuantity = onDecrementItemQuantity;
                self.onDeleteItem = onDeleteItem;
                self.onEmptyCart = onEmptyCart;
                self.onConfirmPurchase = onConfirmPurchase;

                self.$doCheck = function (){
                    self.cartTotal = CartService.cartTotal;
                }

                function onIcrementItemQuantity(index) {
                    CartService.AddToCart(self.cartItems[index]); 
                }

                function onDecrementItemQuantity(index) {
                    CartService.RemoveFromCart(self.cartItems[index]);
                }

                function onDeleteItem(index) {
                    CartService.DeleteFromCart(self.cartItems[index]);
                }

                function onEmptyCart() {
                    CartService.EmptyCart();
                }

                function onConfirmPurchase() {
                    CartService.PurchaseConfirmed();
                }
            }
        ]
    }); 