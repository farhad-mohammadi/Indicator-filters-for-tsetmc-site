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

    function ichi_moku(tenkan_period, kijun_period, span_B_period)
    {
        let len = [ih].length-1;
        if ( len <= span_B_period) return;
        for ( let i=0 ; i<len-span_B_period ; i++ )
        {
            let highest = 0;
            let lowest = 1000000;
            for ( let j=i ; j<i+tenkan_period ; j++)
            {
                if ( lowest>[ih][j].PriceMin) lowest = [ih][j].PriceMin;
                if ( highest < [ih][j].PriceMax) highest = [ih][j].PriceMax;
            }
            [ih][i].tenkan = ( highest + lowest ) /2;
            highest = 0;
            lowest = 1000000;
            let highest_candle = 0;
            let lowest_candle = 0;
            for ( let j=i ; j<i+kijun_period ; j++)
            {
                if (lowest > [ih][j].PriceMin)
                {
                    lowest = [ih][j].PriceMin;
                    lowest_candle = j;
                }
                if ( highest < [ih][j].PriceMax)
                {
                    highest = [ih][j].PriceMax;
                    highest_candle = j ;
                }     
            }
                [ih][i].kijun = (highest + lowest)/2;
                highest = 0;
                lowest = 1000000;
                highest_candle = 0;
                lowest_candle = 0;
                for ( let j=i ; j<i+span_B_period ; j++)
                {
                    if (lowest > [ih][j].PriceMin)
                    {
                        lowest = [ih][j].PriceMin;
                        lowest_candle = j;
                    }
                    if ( highest < [ih][j].PriceMax)
                    {
                        highest = [ih][j].PriceMax;
                        highest_candle = j ;
                    }
                    [ih][i].span_B = (highest + lowest)/2;
                    [ih][i].span_A = ([ih][i].tenkan + [ih][i].kijun)/2;
                    [ih][i].highest_candle = highest_candle;
                    [ih][i].lowest_candle = lowest_candle;

            }
        }
    }

    ichi_moku(9, 26, 52);

    if ( (l18)=="فولاد")
    {
        (cfield1)="Tenkan = "+String([ih][0].tenkan);
        (cfield2)="Kijun = "+ String([ih][0].kijun);
        return true;
    }


}()

