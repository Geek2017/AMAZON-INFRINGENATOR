$(document).ready(function() { // Load the function after DOM ready.

    setTimeout(() => {


        $("[data-asin][data-cel-widget]").each(function() {
            // $(this).attr("style", "background-color:red;")
            $(this).find(".s-grid-status-badge-container")
                .prepend("<button class='btn-xs btn btn-success glyphicon glyphicon-plus infAddButton'> ADD</button>")
        });

        $('[data-asin][data-cel-widget]').click(function() {
            var asin = $(this).attr("data-asin")
            var title = $('.a-color-base', this).text();
            var thumbnailURL = $('.s-image-square-aspect img', this).attr('src');
            var price = $('.a-price', this).text();
            var reviewsCount = $('.a-size-base', this).text();

            var brand = title;
            var currencySymbol = "$";
            var reviewsRating = 4.5;

            var selectedProduct = {
                asin,
                thumbnailURL,
                title,
                brand,
                price,
                currencySymbol,
                reviewsCount,
                reviewsRating
            }


            chrome.storage.local.get(null, function(data) {

                // Add  to array
                var selectedProducts = data["SELECTED_PRODUCTS"] || [];
                var matchingProduct = selectedProducts.find(function(arrayProduct) {
                    return selectedProduct.asin == arrayProduct.asin;
                });

                if (!matchingProduct) {
                    selectedProducts.push(selectedProduct);
                    console.log(selectedProducts)
                }

                // Store selected product details in local storage state
                chrome.storage.local.set({
                    [STORAGE_KEY_SELECTED_PRODUCTS]: selectedProducts
                }, function() { return true; });
            });
        });


        $('.infAddButton').click(function() {
            $("[data-asin][data-cel-widget]").trigger("click");
        });



        $(this).find("#inputGoButtonDiv").prepend("<button class='btn-xs btn btn-info loadasin'>Load</button>");

        $('.loadasin').click(function(e) {
            e.preventDefault();
            chrome.storage.local.get(STORAGE_KEY_SELECTED_PRODUCTS, function(result) {
                if (result.SELECTED_PRODUCTS) {
                    console.log(result.SELECTED_PRODUCTS[0].asin)
                    $('#inputASIN').val(result.SELECTED_PRODUCTS[0].asin)
                } else {
                    console.log('NO DATA!')
                }
            });
        });


        function insirtdata() {
            chrome.storage.local.get(STORAGE_KEY_SELECTED_PRODUCTS, function(result) {
                if (result.SELECTED_PRODUCTS) {
                    console.log(result.SELECTED_PRODUCTS[0].asin)
                    $('#inputASIN').val(result.SELECTED_PRODUCTS[0].asin)

                    $("#inputGoButton").click();

                } else {
                    console.log('NO DATA!')
                }
            });
        }

        insirtdata();

        console.log("Infringinator here");
    }, 6000);
});