(
    function () {
        'use strict';

        angular
            .module ('fruitStoreApp')
            .factory ('CartService', ['InventoryService', 
                function (InventoryService) {
                    var service = {};
                    service.cartItems = [];
                    service.cartTotal = 0;
                    
                    service.AddToCart = AddToCart;
                    service.DeleteFromCart = DeleteFromCart;
                    service.RemoveFromCart = RemoveFromCart;
                    service.EmptyCart = EmptyCart;
                    service.PurchaseConfirmed = PurchaseConfirmed;

                    return service;


                    function AddToCart (item) {
                        var itemLocation = service.cartItems.indexOf(item);
                        if (itemLocation === -1) {
                            if (item.quantityRemaining > 0) {
                                item.cartQuantity = 1;
                                service.cartItems.push(item);
                            }
                        } else if ( service.cartItems[itemLocation].cartQuantity < item.quantityRemaining) {
                            service.cartItems[itemLocation].cartQuantity++;  
                        }
                        updateTotal();
                    }

                    function DeleteFromCart(item) {
                        var itemLocation = service.cartItems.indexOf(item);
                        if (itemLocation !== -1) {
                            service.cartItems.splice(itemLocation, 1);
                        }
                        updateTotal();
                    }

                    function RemoveFromCart(item) {
                        var itemLocation = service.cartItems.indexOf(item);
                        if (itemLocation !== -1) {
                            service.cartItems[itemLocation].cartQuantity--;
                            if (service.cartItems[itemLocation].cartQuantity === 0) {
                                service.DeleteFromCart(item);
                            }
                        }
                        updateTotal();
                    }

                    function EmptyCart() {
                        service.cartItems.splice(0, service.cartItems.length);
                        updateTotal();                        
                    }

                    function PurchaseConfirmed() {
                        for (var item in service.cartItems) {
                            InventoryService.RemovePurchasedItem(service.cartItems[item]);
                        }
                        service.EmptyCart();
                    }

                    //private functions
                    function updateTotal() {
                        service.cartTotal = 0;
                        service.cartItems.forEach(function(element) {
                            service.cartTotal += element.cartQuantity*element.price;
                        }, this);
                        
                    }
                }
            ])
    }
)();