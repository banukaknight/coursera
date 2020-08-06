(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider)
.config(Config);

Config.$inject = ['ShoppingListCheckOffServiceProvider'];
function Config(ShoppingListCheckOffServiceProvider) {
  // Save Yaakov from himself
  ShoppingListCheckOffServiceProvider.defaults.maxItems = 5;
}


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list1 = this;

  list1.items1 = ShoppingListCheckOffService.getItems1();

  list1.itemName = "";
  list1.itemQuantity = "";

  list1.removeItem = function (itemIndex, quantity, itemName) {
    ShoppingListCheckOffService.removeItem(itemIndex, quantity, itemName);
  };
}
//-----------------

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;

  list2.items2= ShoppingListCheckOffService.getItems2();

  list2.itemName = "";
  list2.itemQuantity = "";

  list2.addItem = function () {
    try {
      ShoppingListCheckOffService.addItem(list2.itemName, list2.itemQuantity);
    } catch (error) {
      list2.errorMessage = error.message;
    }
  };

}



// If not specified, maxItems assumed unlimited
function ShoppingListCheckOffService(maxItems) {
  var service = this;

  // List of shopping items
  var items1 = [
    {name: 'Cookies', quantity:5 },
    {name: 'Bread', quantity:2 },
    {name: 'Flowers', quantity:4 },
    {name: 'Eggs', quantity:22 },
    {name: 'Books', quantity:3 }
  ];

  var items2 = [  ];


  service.removeItem = function (itemIndex, quantity, itemName) {

    console.log("----removeItem");
    console.log(itemIndex);
    console.log(quantity);
    console.log(itemName);

    console.log(items1);
    console.log(items2);

    // additem code
    var item = {
      name: itemName,
      quantity: quantity
    };
    items2.push(item);
    items1.splice(itemIndex, 1);

  };

  service.getItems1 = function () {
    return items1;
  };

  service.getItems2 = function () {
    return items2;
  };
}

function ShoppingListCheckOffServiceProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: 10
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListCheckOffService(provider.defaults.maxItems);
    return shoppingList;
  };
}

})();
