import Vue from 'vue';
import web3 from 'web3'


Vue.filter('toWei', value => {
  return web3.utils.toWei(value, 'finney')
});
