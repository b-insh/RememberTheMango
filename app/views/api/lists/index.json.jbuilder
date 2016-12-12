@lists.each do |list|
  json.set! list.id do
    json.partial! 'api/lists/list', list: list
  end
end
