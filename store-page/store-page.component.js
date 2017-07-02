'use strict';

angular
    .module('fruitStoreApp')
    .component('storePage', {
        templateUrl: './store-page/store-page.template.html',
        controller: ['InventoryService', 'CartService',
            function StorePageController(InventoryService, CartService) {
                var self = this;
                self.allItems = [];
                self.onAddToCart = onAddToCart;

                (function initController() {
                    loadInventory();
                })();

                self.$doCheck = function () {
                    self.allItems = InventoryService.storeItems;
                }

                function loadInventory() {
                    InventoryService.LoadStore();
                }

                function onAddToCart(index) {
                    CartService.AddToCart(self.allItems[index]);
                }
            }
        ]
    }); 