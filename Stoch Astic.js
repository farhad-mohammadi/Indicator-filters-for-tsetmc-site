//https://github.com/farhad-mohammadi/Indicator-filters-for-tsetmc-site
//telegram : @farhad_m60
true==function()
{
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
    }
    
    function stochastic(k_period,d_period,slowing)
    {
        let len = [ih].length;
        let lowest_array = Array();
        let highest_array = Array();

        for ( let i=0 ; i<len-k_period ; i++ )
        {
            let highest=0;
            let lowest=1000000;
            for ( let j=i ; j<i+k_period; j++)
            {
                if ( lowest>[ih][j].PriceMin) lowest=[ih][j].PriceMin;
                if ( highest<[ih][j].PriceMax) highest=[ih][j].PriceMax;
            }
            highest_array.push(highest);
            lowest_array.push(lowest);
        }
        for (let i=0 ; i<len-k_period-slowing; i++)
        {
            [ih][i].k = 0;
            let temp_h=0;
            let temp_l=0;
            for ( let j=i ; j<i+slowing ; j++ )
            {
                temp_h += [ih][j].PDrCotVal - lowest_array[j];
                temp_l += highest_array[j] - lowest_array[j] ;
            }
            [ih][i].k = Math.round(1000 * temp_h / temp_l)/10;
        }
        for ( let i=0 ; i< len-k_period-d_period-slowing ; i++)
        {
            [ih][i].d=0;
            let mean = 0 ;
            for (let j=i ; j<i+d_period ; j++)
            {
                mean += [ih][j].k;
            }
            [ih][i].d=Math.round(mean/d_period *10)/10;
        }
    }
    stochastic(5,3,3);

    if ( [ih][1].k <= [ih][1].d && [ih][0].k > [ih][0].d && [ih][0].k<25)
    {
        (cfield0)="<h4>در نماد "+(l18)+" کراس خطوط K و D در Stoch Astic اتفاق افتاده است.</h4>";
        (cfield1)="k% = "+String([ih][0].k)+" d% = "+String([ih][0].d);
        return true;
    }
}()