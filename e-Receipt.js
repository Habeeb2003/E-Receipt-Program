$(document).ready(function() {
    let overrall
    let itemNum = 1
    let anInputIsEmpty = false
    let goodsArr = [{name: "Bread", price: "450"}, {name: "Doughnut", price: "200"}, {name: "Coke", price: "150"}, {name: "Bottle Water", price: "100"}, {name: "Meat Pie", price: "350"}]
    BindEvent()
    $('#Add').click(function () {
        let i = 0
        anInputIsEmpty = false;
        $('input').each(function() {
            if ($(this).val() == "") {
                anInputIsEmpty = true;
                return;
            }
            else if(i == $('input').length - 1  && anInputIsEmpty == false){
                Add()
            }
            i++
        })
    })
    function BindEvent() {
        $('input.name').unbind('keyup').keyup(function() {
            for (let i = 0; i < goodsArr.length; i++) {
                console.log('b');
                if (goodsArr[i].name == $(this).val()) {
                    $(this).parent().siblings().children('.price').val(goodsArr[i].price)
                }
            }
        })
        // $('input.price').unbind('keyup').keyup(function () {
        //     if ($(this).parent().siblings().children('.quantity').val() == "") {
        //         return
        //     }
        //     $(this).parent().siblings().children('.total').val(parseFloat($(this).parent().siblings().children('.quantity').val()) * parseFloat($(this).val())) 
        //     OverallTotal() 
        // })
        $('input.quantity').unbind('keyup').keyup(function () {
            if ($(this).parent().siblings().children('.price').val() == "") {
                return
            }
            if ($(this).val() == "") {
                return;
            }
            $(this).parent().siblings().children('.total').val(parseFloat($(this).parent().siblings().children('.price').val()) * parseFloat($(this).val())) 
            OverallTotal()
        })
        $('button.edit').unbind('click').click(function () {
            if ($.trim($(this).html()) == 'EDIT') {
                $(this).parent().siblings().children('input.dis').removeAttr('disabled')
                $(this).html('SAVE')
            }
            else if ($.trim($(this).html()) == 'SAVE') {
                $(this).parent().siblings().children('.dis').attr('disabled', 'true')
                $(this).html('EDIT')
                OverallTotal()
            }
        })
        $('button.delete').unbind('click').click(function(){
            $(this).parents('tr').nextAll().children().find('h6').each(function() {
                $(this).html($(this).html()-1)
                itemNum = $(this).html()
            })
            $(this).parents('tr').remove()
            OverallTotal()
        })
    }
    function OverallTotal(){
        let over = 0
        $('input.total').each(function () {        
            over += parseFloat($(this).val())
        })
        $('#overallTotal').val(over)
    }
    function Add() {
        let a = `
                <tr>
                    <td>
                        <h6 class="mb-">${++itemNum}</h6>
                    </td>
                    <td>
                        <input list="Goods" name="goods" class="dis name">
                            <datalist id="Goods">
                                <option value="Bread">
                                <option value="Doughnut">
                                <option value="Coke">
                                <option value="Bottle Water">
                                <option value="Meat Pie">
                            </datalist>
                    </td>
                    <td>
                        <input type="number" name="" class="dis price" id="itemPrice">
                    </td>
                    <td>
                        <input type="number" name="" class="dis quantity" id="itemQuantity">
                    </td>
                    <td>
                        <input type="number" name="" class="total" id="total">
                    </td>
                    <td>
                        <button class="btn btn-primary edit">
                            EDIT
                        </button>
                        <button class="btn btn-danger delete">
                            DELETE
                        </button>
                    </td>
                </tr>  
                `
        $('input.dis').attr('disabled', 'true')
        $('table').append(a)
        BindEvent()
    }
})