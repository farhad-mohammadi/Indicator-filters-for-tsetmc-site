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

    function bollinger_bands(period)
    {
        let len = [ih].length-period;
        for ( let i=0 ; i<len; i++)
        {
            let sum = 0;
            for ( let j=i ; j<i+period; j++)
            {
                sum += [ih][j].PDrCotVal;
            }
            [ih][i].base_line = Math.round(sum / period*10)/10;
        }
        for ( let i=0 ; i<len ; i++)
        {
            let std = 0;
            for ( let j=i ; j<i+period ; j++ )
            {
                std += ([ih][j].PDrCotVal-[ih][i].base_line)**2;
            }
        std = std / period-1;
        std = Math.sqrt(std);
        [ih][i].upper_band =Math.round( ([ih][i].base_line+ ( 2*std) ) *10 )/10;
        [ih][i].lower_band = Math.round( ([ih][i].base_line- ( 2*std) ) *10 )/10;
        }
    }
    bollinger_bands(20);
    if ( (l18) == 'فولاد' )
    {
        (cfield0)=[ih][0].upper_band;
        (cfield1)=[ih][0].base_line;
        (cfield2)=[ih][0].lower_band;
        return true;
    }
}()