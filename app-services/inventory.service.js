(
    function () {
        'use strict';

        angular
            .module ('fruitStoreApp')
            .factory ('InventoryService', ['$http', 
                function ($http) {
                    var service = {};
                    service.storeItems= [];
                    
                    service.GetInventory = GetInventory;
                    service.RemovePurchasedItem = RemovePurchasedItem;
                    service.LoadStore = LoadStore;

                    return service;

                    function GetInventory () {
                        return $http({
                            method: 'GET',
                            url: '/app-services/store_items.json'
                        })
                        .then( handleSuccess, handleError("Error in getting inventory")
                        );
                    }

                    function LoadStore () {
                        GetInventory().then( function (items) {
                            if (items.success === false) {
                                console.log("loading inventory is failed");
                            } else {
                                service.storeItems = items;
                            }
                        });
                    }

                    function RemovePurchasedItem(item) {
                        service.storeItems[service.storeItems.indexOf(item)].quantityRemaining = service.storeItems[service.storeItems.indexOf(item)].quantityRemaining  - item.cartQuantity;
                    }

                    //private functions
                    function handleSuccess(response) {
                        return response.data;
                    }

                    function handleError (error){
                        return function () {
                            return{ success: false, message: error};
                        }
                    }
                }
            ])
    }
)();