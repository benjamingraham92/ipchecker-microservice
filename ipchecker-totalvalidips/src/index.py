from flask import Flask, request, Response, jsonify
#from flask_cors import CORS
import validate_ips

app = Flask(__name__)
#CORS(app)

@app.route('/')

def validateIPs():

    output = {
        'error': False,
        'items': '',
        'total_valid_ips': 0,
        'results': ''
    }

    try:
        items = request.args.get('items')

        if not items:
            raise ValueError('Input cannot be empty. Please provide a valid string of IP addresses.')

        total_valid_ips = validate_ips.validate_ips(items)
        output['items'] = items
        output['total_valid_ips'] =  total_valid_ips['count']
        output['results'] = total_valid_ips['results']
    
    except ValueError as e:
        output['error'] = True
        output['response'] = str(e)
        response = jsonify(output)
        response.status_code = 400
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Content-Type']='application/json'
        return response
    
    except Exception as e:
        output['error'] = True
        output['response'] = 'An unexpected error occurred: ' + str(e)
        response = jsonify(output)
        response.status_code = 500
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Content-Type']='application/json'
        return response
    
    response = jsonify(output)
    response.headers['Access-Control-Allow-Origin']='*'
    response.headers['Content-Type']='application/json'
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)