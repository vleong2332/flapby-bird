Site 		 = 'Flapby Bird'
Timezone = 'Central Standard Time'
Analytics = '''<script>
	var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-62124340-1']);
  _gaq.push(['_setSiteSpeedSampleRate', 100]);
  _gaq.push(['_trackPageview']);
  (function(){
  	var ga=document.createElement('script');
  	ga.type='text/javascript';
  	ga.async = true;
  	ga.src=('https:'==document.location.protocol?'https://ssl':'http://www')+'.google-analytics.com/ga.js';
  	var s = document.getElementsByTagName('script')[0];
  	s.parentNode.insertBefore(ga,s);
  	})();
</script>'''

# - System
import os
import urllib
import wsgiref.handlers
import webapp2
import json
# - 
from google.appengine.api import mail
# -
from google.appengine.ext import db
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app
# -
from urlparse import urlparse
# -
import time
import datetime
from pytz.gae import pytz


class Form_db(db.Model):
  addTime = db.DateTimeProperty(auto_now_add=True)
  data_id = db.StringProperty()
  email_address = db.StringProperty()

class addForm_db(webapp2.RequestHandler):
  def post(self):
    date_time = datetime.datetime.now(pytz.timezone(Timezone)).strftime("%Y%m%d_%H%M%S")
    data_id = date_time  #Why not store it directly to data_id?

    item = Form_db(key_name=data_id)
    item.data_id = data_id  #Why not store datetime.datetime.now directly here?
    item.email_address = self.request.get('email')

    item.put()
    time.sleep(1)  #Why sleep for 1 second here?

    #I need to print confirmation from here instead of redirect
    # lookup: response python with html code, webapp2.
  	confirmation = '''
  		<div class="id">
  	'''
  	

app = webapp2.WSGIApplication([  #has to be app variable?
	('/add_email/', addForm_db)
	])