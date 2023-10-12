require('dotenv').config()
const csvtojson = require('csvtojson');
const fetch = require('node-fetch');
const ethers = require('ethers');
const _ = require('lodash');
const supa = require('@supabase/supabase-js');


calculateDistribution()

async function calculateDistribution(day='2023-09-13') {
	const stripeSubs = ["jamesyoung", "agostbiro.eth", "j4ck.eth"]
	const superfluidSubs = ["ayushm.eth","0xen","limes.eth","lay2000lbs","corbin.eth", "thumbsup.eth", "tayyab"]
	const fnames = _.concat(stripeSubs, superfluidSubs);
	let dailyUsdcAmt = 0.33
	// console.log(fnames)

	let distributions = []
	const patronStats = []
	const patrons = await getPatrons()

	const days = ['2023-09-11','2023-09-12','2023-09-13','2023-09-14']
	const fids = [716, 99, 358, 66, 6087, 528, 12480, 706, 5283]
	for (let i = 0; i < fids.length; i++) {
		for (let j = 0; j < days.length; j++) {
			let dailyPointObj = await getActionsByDayAndFid(new Date(days[j]), fids[i])
			let dailyPointTotal = _.get(dailyPointObj,'0.total_points', 0)

			let distObj = await calculateDistributionsFromActions(new Date(days[j]), fids[i], dailyPointTotal, dailyUsdcAmt)
			// console.log(distObj)

			distributions = _.concat(distributions, distObj)
			// patronStats.push(patronObj)
		}
	}

	// Patron Stats
	// for (let j = 0; j < days.length; j++) {
	// 	let patronObj = await calculatePatronStats(new Date(days[j]))
	// 	console.log(patronObj)
	// }

	var distributionList =
		  _(distributions)
		  .groupBy('recipientaddress')
		  .map((objs, key) => ({
		    'recipientaddress': key,
		    'tokenamount': _.sumBy(objs, 'tokenamount')
		  }))
		  .value();

  console.log(distributions)

  distributionList.forEach(o => {
  	console.log(`${o.recipientaddress},${o.tokenamount}`)
  })
  console.log(distributionList.length)
  // console.log(output.length)

	// aggregate all distributions
	// calculate and save patron stats

}




async function calculatePatronStats(day, fid=0, dailyPoints=0, dailyTokens=0) {
  try {
  	const supabase = supa.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const { data, error } = await supabase
      .rpc('calc_patron_stats', { p_day: day, p_fid: fid, p_daily_points: dailyPoints, p_daily_tokens: dailyTokens});

    if (error) {
      console.error('Error executing function:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('An unexpected error occurred:', err);
    return null;
  }
}


async function calculateDistributionsFromActions(day, fid, dailyPoints, dailyTokens) {
  try {
  	const supabase = supa.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const { data, error } = await supabase
      .rpc('calc_dist_from_actions', { p_day: day, p_fid: fid, p_daily_points: dailyPoints, p_daily_tokens: dailyTokens});

    if (error) {
      console.error('Error executing function:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('An unexpected error occurred:', err);
    return null;
  }
}


/**
 * Calls the get_actions_by_day_and_fid database function using Supabase.
 * @param {string} day - The day parameter in 'YYYY-MM-DD' format.
 * @param {number} fid - The fid parameter.
 * @returns {Promise} - A promise that resolves with the query result or null in case of an error.
 */
async function getActionsByDayAndFid(day, fid) {
  try {
  	const supabase = supa.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const { data, error } = await supabase
      .rpc('get_actions_by_day_and_fid', { p_day: day, p_fid: fid });

    if (error) {
      console.error('Error executing function:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('An unexpected error occurred:', err);
    return null;
  }
}


/**
 * Runs an arbitrary SQL query in Supabase.
 * @param {string} query - The SQL query string.
 * @returns {Promise} - A promise that resolves with the query result or null in case of an error.
 */
async function runQuery(query) {
  try {
  	const supabase = supa.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const { data, error } = await supabase.raw(query);

    if (error) {
      console.error('Error executing query:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('An unexpected error occurred:', err);
    return null;
  }
}


// Async function to retrieve all rows from the public.patrons table
async function getPatrons() {
  try {
  	const supabase = supa.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

    const { data, error } = await supabase
      .from('patrons')
      .select('*');

    if (error) {
      console.error('Error fetching data:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('An unexpected error occurred:', err);
    return null;
  }
}

