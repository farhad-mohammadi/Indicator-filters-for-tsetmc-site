//https://github.com/farhad-mohammadi/Indicator-filters-for-tsetmc-site
//telegram : @farhad_m60
true==function()
{
    //این برنامه برای تمیز کردن داده های سایت TSETMC برای استفاده 
    //در برنامه های اندیکاتوری برای دقت بیشتر طراحی شده است.
    if ( [ih][0].PriceMax!= (pmax) || [ih][0].PDrCotVal != (pl) || [ih][0].QTotTran5J != (tvol) )
    {
        if ( typeof [ih][1].fixed == "undefined")
        {
            [ih].unshift(Object.assign({}, [ih][0]));
            [ih][1].fixed=true;
        }
        [ih][0].PriceFirst=(pf);
        [ih][0].PClosing=(pc);
        [ih][0].PDrCotVal=(pl);
        [ih][0].ZTotTran=(tno);
        [ih][0].QTotTran5J=(tvol);
        [ih][0].QTotCap=(tval);
        [ih][0].PriceChange=(pcc);
        [ih][0].PriceMin=(pmin);
        [ih][0].PriceMax=(pmax);
        [ih][0].PriceYesterday=(py);
    }
    function clear(data)
    {
        if ( data.PriceMax!=0 || data.PriceMin!=0) return data;
    }
    
    if ( typeof [ih][1].history=="undefined")
    {
        [ih]=[ih].filter(clear);
        [ih][1].history=true;
    }// از اینجا به بعد داده های [ih] بروز و تمیز هستند

    // تابع زیر برای تشخیص افزایش سرمایه در طول دوره ای که ورودی میگیرد
    //برای نماد هایی که در دوره ی period  تغییرات بیشتر از 15 درصدی دارند  false و درغیر اینصورت true بر میگردانَد
    function capital_increase(period)
    {
        let len = [ih].length;
        if ( period>len) return false;
        let change_percent=0;
        for (let i=0; i<period; i++)
        {
            change_percent= ([ih][i].PriceYesterday - [ih][i].PDrCotVal)/[ih][i].PriceYesterday;
            change_percent= Math.abs( 100 * change_percent);
            if ( change_percent > 15)
            {
                return false;
            }
        }
        return true;
    }
    //بعد از این خط تابع های اندیکاتوری خود را کپی کرده و با داده تمیز از آنها استفاده کنید
}()