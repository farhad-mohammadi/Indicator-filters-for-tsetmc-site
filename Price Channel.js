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

    function price_channel(period)
    {
        let len = [ih].length;
        if ( period > len-1) return ;
        for ( let i=0 ; i<len-period ; i++)
        {
            let highest = 0;
            let highest_candle = 0;
            let lowest = 1000000;
            let lowest_candle = 0;
            for ( let j=i+1 ; j<i+period+1 ; j++)
            {
                if ( highest<[ih][j].PriceMax) 
                {
                    highest = [ih][j].PriceMax;
                    highest_candle = j;
                }
                if ( lowest>[ih][j].PriceMin)
                {
                    lowest = [ih][j].PriceMin;
                    lowest_candle = j;
                }
            }
            [ih][i].upper_channel = highest;
            [ih][i].median = ( highest + lowest) /2;
            [ih][i].lower_channel = lowest ;
            [ih][i].high_price_candle = highest_candle;
            [ih][i].low_price_candle = lowest_candle;
        }
    }

    price_channel(22);
    let diff = 100 * ( [ih][0].PDrCotVal - [ih][0].lower_channel ) / [ih][0].lower_channel;
    if ( [ih][0].low_price_candle>2 && [ih][0].low_price_candle<20&& diff<4 && diff>0)
    {
        (cfield0)=[ih][0].upper_channel;
        (cfield1)=[ih][0].median;
        (cfield2)=[ih][0].lower_channel;
        return true;
    }
}()
