require "net/http"
require "uri"
require "json"

uri = URI.parse("http://www.ekidata.jp/api/l/11302.json")
json = Net::HTTP.get(uri)
result= JSON.parse(json)
puts result